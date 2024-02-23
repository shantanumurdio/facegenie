import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithCustomToken, deleteUser } from "firebase/auth";
import { firebasedb, auth, firebaseStorage } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, deleteField, addDoc, where, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
const dayjs = require('dayjs');

const successObj = (data, message) => {
    return { status: true, data: data, message: message }
}

const errorObj = (message) => {
    return { status: false, message: message }
}

const getCurrentDate = () => {
    return dayjs().format('DD-MM-YYYY');
}

export const submitLogs = () => {

}

const refineMessage = (message) => {
    switch (true) {
        case message.includes('auth/wrong-password'):
            return 'Invalid Password';
            break;
        case message.includes('auth/user-not-found'):
            return 'User Not found';
            break;
        case message.includes('temporarily disabled'):
            return 'Access to this account has been temporarily disabled due to many failed login attempts';
            break;
        default:
            return 'Invalid email or password.';
    }

}

//for user signin

const findUserDoc = async (uid) => {
    const clients = await getDocs(collection(firebasedb, "Clients_data"));
    for (const doc of clients.docs) {
        if (doc.data().LocalIds.includes(uid)) {
            return doc.id;
        }
    }
    return null;
}

export const userSignin = async (values) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        if (userCredential.user) {
            return successObj({  email: userCredential.user?.email }, 'Login Successful');
        }
        else {
            return errorObj('Email Does not Exist in any doc')
        }
    } catch (err) {
        return errorObj(refineMessage(err.message));
    }
};


export const userLogout = (navigate) => {
    signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            // An error happened.
            console.error('Error signing out:', error);
        });
};



// To get dashboardanalytics data

export const fetchDashboardAnalytics = async (docId, filterDate) => {
    try {
        const date = filterDate ?? getCurrentDate()
        let docRef = doc(firebasedb, `Clients_data/${docId}/DashboardAnalytics`, date);
        const docSnap = await getDoc(docRef)
        const data = docSnap.data() ?? {}
        return successObj(data, 'Success')
    }

    catch (err) {
        return errorObj(err.message)
    }
}

//to fetch all students
export const fetchAllStudents = async (docId) => {
    try {
        const classList = []
        const sectionsList = []
        const studentRef = collection(firebasedb, `Clients_data/${docId}/StudentData`);
        const studentsDocs = await getDocs(studentRef);
        const studentsData = studentsDocs.docs.map(doc => {
            const studentDoc = doc.data()
            classList.push(studentDoc.class)
            sectionsList.push(studentDoc.section)
            return studentDoc
        });
        return successObj(
            {
                studentsData: studentsData,
                classList: [...new Set(classList)].sort(),
                sectionsList: [...new Set(sectionsList)].sort()
            }, 'success'
        )
    }
    catch (err) {
        return errorObj(err.message)
    }
}

// TO fetch Attendance of single date

const convertFormat = (data, studentsList) => {
    try {
        const convertedData = []
        Object.values(data).forEach(dateWiseEntry => {
            Object.entries(dateWiseEntry).forEach(([qrId, attObj]) => {
                let obj = {}
                const student = studentsList.find(student => student.qrid === qrId);
                let lastActivity, lastActivityBusId, checkinBus, checkoutBus
                const logs = attObj.LogsDict
                if (logs.length > 1) {
                    lastActivity = logs[1].TimeStamp
                    lastActivityBusId = logs[1].BusID
                    checkoutBus = logs[1].BusID
                    checkinBus = logs[0].BusID
                }
                else {
                    lastActivity = logs[0].TimeStamp
                    lastActivityBusId = logs[0].BusID
                    checkoutBus = ''
                    checkinBus = logs[0].BusID
                }

                obj.checkinBus = checkinBus
                obj.checkoutBus = checkoutBus
                obj.admissionNo = qrId.split('R')[2];
                obj.name = student?.fullName || '';
                obj.class = student?.class || '';
                obj.section = student?.section || '';
                obj.lastActivityBusId = lastActivityBusId
                obj.lastActivity = `${lastActivity.split(" ")[0]} ${lastActivity.split(" ")[2]}`;
                convertedData.push(obj)
            })
        })

        return convertedData
    }
    catch (err) {
        console.log(err)
    }
}

export const fetchAttendance = async (docId, studentsList, filterDate) => {
    try {
        const suffixArray = ["", "_A", "A", "B", "C", "D", "_B", "_C", "_D"];
        const date = filterDate ?? getCurrentDate();
        const obj = { [date]: {} };
        const promises = suffixArray.map(async (alpha) => {
            const docRef = doc(firebasedb, `Clients_data/${docId}/Attendance`, `${date}${alpha}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                obj[date] = { ...obj[date], ...docSnap.data() };
            }
        });
        await Promise.all(promises);

        return successObj(convertFormat(obj, studentsList), 'Success');
    } catch (error) {
        return errorObj(error.message);
    }
};



// to fetch all buses

export const fetchAllLicenses = async (docId) => {
    try {
        const docRef = collection(firebasedb, `Clients_data/${docId}/Supervisor`)
        const docSnap = await getDocs(docRef)
        const licenses = docSnap.docs.map(doc => doc.data())
        const busesList = licenses.filter(l => l.licenseStatus === 'Active').map(l => l.busNo)
        return successObj({ buses: busesList.sort(), licenses: licenses }, 'success')
    }
    catch (err) {
        return errorObj(err.message)
    }
}

//adding and updating students

export const addStudent = async (docId, data) => {
    try {
        await setDoc(doc(firebasedb, `Clients_data/${docId}/StudentData`, `${data.qrid}`), data);
        return successObj(data, 'Student Saved Successfully')
    }
    catch (err) {
        return errorObj(err.message)
    }
}


// License add and edit

export const handleUploadFile = async (uid, file) => {
    const storageRef = ref(firebaseStorage, `BusAttendance_Supervisor/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
        const url = await new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                null,
                null,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            resolve(url);
                        })
                }
            );
        });

        return successObj(url, 'Upload Successful'); // Return the download URL
    } catch (error) {
        console.log(error);
        return errorObj('Error in uploading the image');
    }
}

export const handleAddNewLicense = async (docId, data) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const uid = userCredential.user.uid
        await setDoc(doc(firebasedb, `Clients_data/${docId}/Supervisor`, uid), { ...data, uid: uid })
        return successObj({ ...data, uid: uid }, 'Employee Added Successfully')
    }
    catch (err) {
        console.log(err)
        return errorObj(err.message)
    }
}

export const handleUpdateLicense = async (docId, data) => {
    try {
        const docref = doc(firebasedb, `Clients_data/${docId}/Supervisor`, data.uid)
        await updateDoc(docref, data)
        return successObj(data, 'License Saved successfully')
    }
    catch (err) {
        console.log(err)
        return errorObj(err.message)
    }
}


// For sync frequency

export const fetchSyncFreq = async (docId) => {
    try {
        const docRef = doc(firebasedb, `Clients_data/${docId}/Default_config`, 'SyncFreqConfig');
        const docSnap = await getDoc(docRef);
        return successObj(docSnap.data(), 'Success')
    }
    catch (err) {
        errorObj(err.message)
    }
}

export const setSyncFrequency = async (docId, data) => {
    try {
        await setDoc(doc(firebasedb, `Clients_data/${docId}/Default_config`, 'SyncFreqConfig'), data);
        return successObj(data, 'Frequencies Updated Successfully')
    }
    catch (err) {
        return errorObj(err.message)
    }
}

export const getLastSync = async (docId, filterDate) => {
    try {
        const date = filterDate ?? getCurrentDate();
        let docRef = doc(firebasedb, `Clients_data/${docId}/LastSync`, `${date}`);
        const docSnap = await getDoc(docRef)
        return successObj(docSnap.data(), 'Success')
    }
    catch(err){
        return errorObj(err.message)
    }
}