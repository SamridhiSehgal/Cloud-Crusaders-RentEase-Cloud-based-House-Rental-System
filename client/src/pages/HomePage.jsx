// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Card from '../components/Card';
// import OwnerLoginPopup from './owner/OwnerLogin';
// import TenantLoginPopup from './tenant/TenantLogin';
// import {Link} from 'react-router-dom';

// const HomePage = () => {
//     const [showOwnerPopup, setShowOwnerPopup] = useState(false);
//     const [showTenantPopup, setShowTenantPopup] = useState(false);

//     // Background Images
//     const ownerBg = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36';
//     const roomsBg = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0';
//     const tenantBg = 'https://images.unsplash.com/photo-1582719508461-905c673771fd';

//     // Check if any popup is open
//     const isPopupOpen = showOwnerPopup || showTenantPopup;

//     return (
//         <>
//             <Navbar />
//             <div className={`relative w-full h-screen bg-cover bg-center text-white transition-opacity duration-300 ${isPopupOpen ? 'opacity-30 pointer-events-none' : 'opacity-100'}`} 
//                 style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg=)' }}>
//                 <div className="absolute inset-0 bg-black opacity-50"></div>
//                 <div className="relative flex flex-col items-center justify-center h-full">
//                     <h1 className="text-6xl font-bold">Make Renting Easy</h1>
//                     <p className="mt-4 text-xl">With RentEase, lease anything from vehicles to rooms with just a few easy clicks.</p>

//                     <div className="flex gap-12 mt-12">
//                         <Card 
//                             title="Owner"
//                             description="Add your room for rent"
//                             backgroundImage={ownerBg}
//                             onClick={() => setShowOwnerPopup(true)}
//                         />
//                         <Link to='/room-list'>
//                             <Card 
//                                 title="Rooms"
//                                 description="Visit Rooms List"
//                                 backgroundImage={roomsBg}
//                             />
//                         </Link>
//                         <Card 
//                             title="Tenant"
//                             description="Find a room to rent"
//                             backgroundImage={tenantBg}
//                             onClick={() => setShowTenantPopup(true)}
//                         />
//                     </div>

//                     <div className="mt-10">
//                         <input 
//                             type="text" 
//                             placeholder="Search Rentals" 
//                             className="w-96 px-4 py-2 rounded-full border shadow-md focus:outline-none" 
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Owner Login Popup */}
//             {showOwnerPopup && (
//                 <OwnerLoginPopup onClose={() => setShowOwnerPopup(false)} />
//             )}

//             {/* Tenant Login Popup */}
//             {showTenantPopup && (
//                 <TenantLoginPopup onClose={() => setShowTenantPopup(false)} />
//             )}
//         </>
//     );
// };

// export default HomePage;
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import OwnerLoginPopup from './owner/OwnerLogin';
import TenantLoginPopup from './tenant/TenantLogin';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage = () => {
    const [showOwnerPopup, setShowOwnerPopup] = useState(false);
    const [showTenantPopup, setShowTenantPopup] = useState(false);

    // Background Images
    const ownerBg = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36';
    const roomsBg = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0';
    const tenantBg = 'https://images.unsplash.com/photo-1582719508461-905c673771fd';

    // Check if any popup is open
    const isPopupOpen = showOwnerPopup || showTenantPopup;

    return (
        <>
            <Navbar />
            <div className={`relative mt-[72px] w-full h-screen bg-cover bg-center text-white transition-opacity duration-300 ${isPopupOpen ? 'opacity-30 pointer-events-none' : 'opacity-100'}`} 
                style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg=)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">Make Renting Easy</h1>
                    <p className="mt-4 text-lg md:text-xl">With RentEase, lease anything from vehicles to rooms with just a few easy clicks.</p>

                    <div className="flex flex-col md:flex-row gap-6 mt-8 md:gap-12">
                        <Card 
                            title="Owner"
                            description="Add your room for rent"
                            backgroundImage={ownerBg}
                            onClick={() => setShowOwnerPopup(true)}
                        />
                        <Link to='/room-list'>
                            <Card 
                                title="Rooms"
                                description="Visit Rooms List"
                                backgroundImage={roomsBg}
                            />
                        </Link>
                        <Card 
                            title="Tenant"
                            description="Find a room to rent"
                            backgroundImage={tenantBg}
                            onClick={() => setShowTenantPopup(true)}
                        />
                    </div>

                    <div className="mt-6 md:mt-10 w-full md:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search Rentals" 
                            className="w-full md:w-96 px-4 py-2 rounded-full border shadow-md focus:outline-none" 
                        />
                    </div>
                </div>
            </div>

            {/* Owner Login Popup */}
            {showOwnerPopup && (
                <OwnerLoginPopup onClose={() => setShowOwnerPopup(false)} />
            )}

            {/* Tenant Login Popup */}
            {showTenantPopup && (
                <TenantLoginPopup onClose={() => setShowTenantPopup(false)} />
            )}
            <Footer/>
        </>
    );
};

export default HomePage;
