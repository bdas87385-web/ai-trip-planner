import { db } from "./firebase";
import {
  collection, addDoc, getDocs,
  query, where, orderBy, deleteDoc, doc
} from "firebase/firestore";

export async function saveTrip(userId: string, tripData: object, plan: string) {
  return addDoc(collection(db, "trips"), {
    userId, tripData, plan,
    createdAt: new Date(),
  });
}

export async function getUserTrips(userId: string) {
  const q = query(
    collection(db, "trips"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deleteTrip(tripId: string) {
  await deleteDoc(doc(db, "trips", tripId));
}