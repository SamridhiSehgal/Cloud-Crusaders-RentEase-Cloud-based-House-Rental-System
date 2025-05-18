import React, { useState } from 'react';
import TenantLoginPopup from '../../components/TenantLoginPopup';

const TenantLogin = () => {
    const [showPopup, setShowPopup] = useState(true);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {showPopup && <TenantLoginPopup onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default TenantLogin;
