import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useMutation } from "@apollo/client";
import "../styles/modal.css";
import { GET_VILLAGES, ADD_VILLAGE, UPDATE_VILLAGE, DELETE_VILLAGE } from "../queries/villageQueries";

function VillagesOptionsModal({ isOpen, onClose, type, village }) {
  const [villageName, setVillageName] = useState('');
  const [region, setRegion] = useState('');
  const [landArea, setLandArea] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState('');

  const [addVillage] = useMutation(ADD_VILLAGE, {
    update(cache, { data: { addVillage } }) {
      const existingVillages = cache.readQuery({ query: GET_VILLAGES });
      cache.writeQuery({
        query: GET_VILLAGES,
        data: {
          villages: [...existingVillages.villages, addVillage],
        },
      });
    },
    onError: (error) => console.error("Error adding village:", error),
  });

  const [updateVillage] = useMutation(UPDATE_VILLAGE, {
    onError: (error) => console.error("Error updating village:", error),
  });

  const [deleteVillage] = useMutation(DELETE_VILLAGE, {
    update(cache, { data: { deleteVillage } }) {
      const existingVillages = cache.readQuery({ query: GET_VILLAGES });
      const updatedVillages = existingVillages.villages.filter(
        (village) => village.name !== deleteVillage.name
      );
      cache.writeQuery({
        query: GET_VILLAGES,
        data: { villages: updatedVillages },
      });
    },
    onError: (error) => console.error("Error deleting village:", error),
  });

  useEffect(() => {
    if (type === 'update' && village) {
      setVillageName(village.name || '');
      setRegion(village.region || '');
      setLandArea(village.landArea ? village.landArea.toString() : '');
      setLatitude(village.latitude ? village.latitude.toString() : '');
      setLongitude(village.longitude ? village.longitude.toString() : '');
      setCategories(village.categories.join(', ') || '');
      setImage(village.image || null);
    }
  }, [type, village]);

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

    if (type === 'update') {
      updateVillage({ 
        variables: { 
          name: newVillage.name, 
          village: newVillage,   
        }
      });
    } else if (type === 'add') {
      addVillage({ 
        variables: { 
          village: newVillage, 
        }
      });
    }

    resetForm();
    onClose();
  };

  const handleDelete = () => {
    deleteVillage({ variables: { name: village.name } });
    onClose();
  };

  const resetForm = () => {
    setVillageName('');
    setRegion('');
    setLandArea('');
    setLatitude('');
    setLongitude('');
    setImage(null);
    setCategories('');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      contentLabel={type === 'view' ? 'View Village Details' : (type === 'delete' ? 'Delete Village Confirmation' : 'Add/Update Village')}
      className="modal" 
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>
          {type === 'update' ? 'Update Village' : 
           (type === 'view' ? village.name : 
           (type === 'delete' ? 'Confirm Deletion' : 'Add New Village'))}
        </h2>
        <button className="modal-close" onClick={onClose}>&#10006;</button>
      </div>
      <div className="modal-body">
        {type === 'view' && village ? (
          <>
            <div className="village-image">
              {village.image ? (
                <img src={village.image} alt={village.name} />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="village-details">
              <p><strong>Region:</strong> {village.region}</p>
              <p><strong>Land Area:</strong> {village.landArea} sq km</p>
              <p><strong>Latitude:</strong> {village.latitude}</p>
              <p><strong>Longitude:</strong> {village.longitude}</p>
              <p><strong>Categories:</strong> {village.categories.join(", ")}</p>
            </div>
          </>
        ) : type === 'delete' ? (
          <p>Are you sure you want to delete the village "{village.name}"?<br/>This action cannot be undone.</p>
        ) : (
          <>
            <label>
              Village Name:
              <input
                type="text"
                value={villageName || ''}
                onChange={(e) => setVillageName(e.target.value)}
              />
            </label>
            <label>
              Region/District:
              <input
                type="text"
                value={region || ''}
                onChange={(e) => setRegion(e.target.value)}
              />
            </label>
            <label>
              Land Area (sq km):
              <input
                type="number"
                value={landArea || ''}
                onChange={(e) => setLandArea(e.target.value)}
              />
            </label>
            <label>
              Latitude:
              <input
                type="number"
                step="0.000001"
                value={latitude || ''}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </label>
            <label>
              Longitude:
              <input
                type="number"
                step="0.000001"
                value={longitude || ''}
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
              Categories/Tags:
              <input
                type="text"
                placeholder="e.g., rural, urban"
                value={categories || ''}
                onChange={(e) => setCategories(e.target.value)}
              />
            </label>
          </>
        )}
      </div>
      <div className="modal-footer">
        {type === 'delete' ? (
          <>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : type !== 'view' && (
          <button onClick={handleSave}>{type === 'update' ? 'Update Village' : 'Add Village'}</button>
        )}
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default VillagesOptionsModal;
