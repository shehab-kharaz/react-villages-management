import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Modal from "react-modal";
import VillageForm from "../Modals/VillageForm";
import VillageInfo from "../Modals/VillageInfo";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import DemographicForm from "../Modals/DemographicForm";
import "../../styles/modal.css";
import {
  GET_VILLAGES,
  ADD_VILLAGE,
  UPDATE_VILLAGE,
  DELETE_VILLAGE,
  UPDATE_DEMOGRAPHIC,
} from "../../queries/villageQueries";


function VillagesOptionsModal({ isOpen, onClose, type, village }) {
  const [formState, setFormState] = useState({
    villageName: "",
    region: "",
    landArea: "",
    latitude: "",
    longitude: "",
    image: null,
    categories: "",
    populationSize: null,
    ageDistribution: "",
    genderRatio: "",
    populationGrowthRate: null,
  });

  const resetForm = () => {
    setFormState({
      villageName: "",
      region: "",
      landArea: "",
      latitude: "",
      longitude: "",
      image: null,
      categories: "",
      populationSize: null,
      ageDistribution: "",
      genderRatio: "",
      populationGrowthRate: null,
    });
  };

  const [updateVillageDemographic] = useMutation(UPDATE_DEMOGRAPHIC, {
    onError: (error) => console.error("Error updating demographic:", error),
  });

  const [updateVillage] = useMutation(UPDATE_VILLAGE, {
    onError: (error) => console.error("Error updating village:", error),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleDelete = () => {
    deleteVillage({ variables: { name: village.name } });
    onClose();
  };

  const [addVillage] = useMutation(ADD_VILLAGE, {
    update(cache, { data: { addVillage } }) {
      const existingVillages = cache.readQuery({ query: GET_VILLAGES });
      cache.writeQuery({
        query: GET_VILLAGES,
        data: { villages: [...existingVillages.villages, addVillage] },
      });
    },
    onError: (error) => console.error("Error adding village:", error),
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
    if (type === "update" && village) {
      setFormState({
        villageName: village.name || "",
        region: village.region || "",
        landArea: village.landArea ? village.landArea.toString() : "",
        latitude: village.latitude ? village.latitude.toString() : "",
        longitude: village.longitude ? village.longitude.toString() : "",
        image: village.image || null,
        categories: village.categories ? village.categories.join(", ") : "",
        populationSize: village.demographic?.populationSize || null,
        ageDistribution: village.demographic?.ageDistribution
          ? Object.values(village.demographic.ageDistribution).join(", ")
          : "",
        genderRatio: village.demographic?.genderRatio
          ? [village.demographic.genderRatio.male, village.demographic.genderRatio.female].join(", ")
          : "",
        populationGrowthRate: village.demographic?.populationGrowthRate || null,
      });
    } else {
      resetForm();
    }
  }, [type, village]);

  const handleSave = () => {
    const [age_0_18, age_19_35, age_36_50, age_51_65, age_65_plus] = formState.ageDistribution
      .split(",")
      .map(Number);
    const [male, female] = formState.genderRatio.split(",").map(Number);

    const updatedDemographic = {
      populationSize: Number(formState.populationSize),
      ageDistribution: { age_0_18, age_19_35, age_36_50, age_51_65, age_65_plus },
      genderRatio: { male, female },
      populationGrowthRate: Number(formState.populationGrowthRate),
    };

    if (type === "update-demographic") {
      updateVillageDemographic({
        variables: {
          name: village.name,
          village: { name: village.name, demographic: updatedDemographic },
        },
      })
        .then(() => onClose())
        .catch((error) => console.error("Error updating demographic data:", error));
    } else if (type === "add") {
      const newVillage = {
        name: formState.villageName,
        region: formState.region,
        landArea: Number(formState.landArea),
        latitude: parseFloat(formState.latitude),
        longitude: parseFloat(formState.longitude),
        image: formState.image ? URL.createObjectURL(formState.image) : null,
        categories: formState.categories.split(",").map((tag) => tag.trim()),
        demographic: updatedDemographic,
      };

      addVillage({ variables: { village: newVillage } })
        .then(() => onClose())
        .catch((error) => console.error("Error adding new village:", error));
    } else if (type === "update") {
      const updatedVillage = {
        name: formState.villageName,
        region: formState.region,
        landArea: Number(formState.landArea),
        latitude: parseFloat(formState.latitude),
        longitude: parseFloat(formState.longitude),
        image: formState.image ? URL.createObjectURL(formState.image) : null,
        categories: formState.categories.split(",").map((tag) => tag.trim()),
        demographic: updatedDemographic,
      };

      updateVillage({
        variables: {
          name: formState.villageName,
          village: updatedVillage,
        },
      })
        .then(() => onClose())
        .catch((error) => console.error("Error updating village:", error));
    }

    resetForm();
  };

  const renderContent = () => {
    if (type === 'view' && village) {
      return <VillageInfo village={village} />;
    } else if (type === 'delete') {
      return <DeleteConfirmation name={village.name} />;
    } else if (type === 'update-demographic' && village) {
      return <DemographicForm formState={formState} handleChange={handleChange} />;
    } else {
      return <VillageForm formState={formState} handleChange={handleChange} handleImageUpload={handleImageUpload} />;
    }
  };
  
  function renderModalFooterButtons(type, handleDelete, handleSave, onClose) {
    if (type === 'delete') {
      return (
        <>
          <button 
            className="delete-confirmation" 
            onClick={handleDelete}>
            Confirm Deletion
          </button>
          <button onClick={onClose}>Cancel</button>
        </>
      );
    }
  
    if (type !== 'view') {
      return (
        <>
          <button 
            className="add-update-btn" 
            onClick={handleSave}>
            {type === 'add' ? 'Add new village' : 'Save Changes'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </>
      );
    }
  
    return null; 
  }

  function renderModalHeader(type, onClose) {
    const getHeaderTitle = () => {
      switch (type) {
        case 'view':
          return 'Village Information';
        case 'update':
          return 'Update Village';
        case 'update-demographic':
          return 'Update Demographics';
        case 'add':
          return 'Add New Village';
        case 'delete':
        default:
          return 'Delete Confirmation';
      }
    };
  
    return (
      <>       
        <h2 className="modal-header">
          {getHeaderTitle()}
        </h2>
        <button className="modal-close" onClick={onClose}>
          &#10006;
        </button>
      </> 
    );
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Village Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        {renderModalHeader(type, onClose)}
      </div>
      <div className="modal-body">
        {renderContent()}
        </div>
      <div className="modal-footer">
        {renderModalFooterButtons(type, handleDelete, handleSave, onClose)}
      </div>
    </Modal>
  );
}

export default VillagesOptionsModal;






