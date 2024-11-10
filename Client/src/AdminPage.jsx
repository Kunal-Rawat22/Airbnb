import { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyBookings = ({ propertyId }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`/property/${propertyId}/booking`);
                setBookings(response.data);
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [propertyId]);

    if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Bookings for Property ID: {propertyId}
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left text-gray-700 font-medium">Date</th>
                            <th className="px-4 py-2 border-b text-left text-gray-700 font-medium">Admin</th>
                            <th className="px-4 py-2 border-b text-left text-gray-700 font-medium">Guest</th>
                            <th className="px-4 py-2 border-b text-left text-gray-700 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="odd:bg-gray-50 even:bg-white">
                                <td className="px-4 py-3 border-b text-gray-600">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="px-4 py-3 border-b text-gray-600">{booking.adminName}</td>
                                <td className="px-4 py-3 border-b text-gray-600">{booking.guestName}</td>
                                <td className="px-4 py-3 border-b text-gray-600">{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyBookings;