import "../styles/modal.css";
import React, { useState } from 'react';

function AddVillageModal({ onClose, onSave }) {
    const [villageName, setVillageName] = useState('');
    const [region, setRegion] = useState('');
    const [landArea, setLandArea] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); 
        }
    };

    const handleSave = () => {
        
        const newVillage = {
            name: villageName,
            region,
            landArea: Number(landArea),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            image: image ? URL.createObjectURL(image) : null, 
            categories: categories.split(',').map(tag => tag.trim()), 
            demographic: {
                populationSize: 0,  
                ageDistribution: {
                    age_0_18: 0,
                    age_19_35: 0,
                    age_36_50: 0,
                    age_51_65: 0,
                    age_65_plus: 0,
                },
                genderRatio: {
                    male: 0,
                    female: 0,
                },
                populationGrowthRate: 0,
            },
        };

        onSave(newVillage); 
        setVillageName('');
        setRegion('');
        setLandArea('');
        setLatitude('');
        setLongitude('');
        setImage(null);
        setCategories('');
        onClose(); 
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Village</h2>
                    <button className="modal-close" onClick={onClose}>&#10006;</button>
                </div>
                <div className="modal-body">
                    <label>
                        Village Name:
                        <input
                            type="text"
                            value={villageName}
                            onChange={(e) => setVillageName(e.target.value)}
                        />
                    </label>
                    <label>
                        Region/District:
                        <input
                            type="text"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                    </label>
                    <label>
                        Land Area (sq km):
                        <input
                            type="number"
                            value={landArea}
                            onChange={(e) => setLandArea(e.target.value)}
                        />
                    </label>
                    <label>
                        Latitude:
                        <input
                            type="number"
                            step="0.000001"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </label>
                    <label>
                        Longitude:
                        <input
                            type="number"
                            step="0.000001"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </label>
                    <label>
                        Upload Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                    <label>
                        Categories/Tags (comma-separated):
                        <input
                            type="text"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                        />
                    </label>
                </div>
                <div className="modal-footer">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddVillageModal;
