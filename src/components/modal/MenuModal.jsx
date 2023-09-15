import React, { useState, useEffect } from "react";
import Modal from "@/components/modal/Modal";
import { db } from "../firebase/FirebaseApp";
import { collection, getDocs } from "firebase/firestore";

export default function RestaurantModal({ selectedRestaurant }) {
    const [open, setOpen] = useState(false);
    const [subcollectionData, setSubcollectionData] = useState([]);

    const loadMenu = async () => {
        try {
            const restaurantId = selectedRestaurant.id;
            const subcollectionRef = collection(
                db,
                "restaurantDB",
                restaurantId,
                "FoodList"
            );
            const subcollectionSnapshot = await getDocs(subcollectionRef);
            const subcollectionData = subcollectionSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setSubcollectionData(subcollectionData);
        } catch (error) {
            console.error("Error loading subcollection: ", error);
        }
    };

    useEffect(() => {
        if (open) loadMenu();
        else setSubcollectionData([]); // clear
    }, [open]);

    return (
        <div className="flex">
            <button
                className="font-light text-sm"
                onClick={() => setOpen(true)}
            >
                Menu
            </button>

            <Modal
                open={open}
                maxW={"w-25%"}
                maxH={"h-50%"}
                onClose={() => setOpen(false)}
            >
                <div className="w-full h-full bg-slate-300 rounded-lg">
                    <h3 className="font-bold text-lg">
                        {selectedRestaurant.name} (Menu)
                    </h3>

                    {subcollectionData.length > 0 ? (
                        <div id="menu">
                            {subcollectionData.map((menu) => (
                                <ul className="flex justify-between">
                                    <li>{menu.name}</li>
                                    <li>${menu.price.toFixed(2)}</li>
                                </ul>
                            ))}
                        </div>
                    ) : (
                        <div>No menu</div>
                    )}
                </div>
            </Modal>
        </div>
    );
}
