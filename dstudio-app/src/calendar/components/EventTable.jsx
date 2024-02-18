import React, { useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { getEnvVariables } from '../../helpers';

const { VITE_API_URL } = getEnvVariables();
const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const EventTable = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editEventData, setEditEventData] = useState({
    id: null,
    title: '',
    start: '',
    end: '',
    notes: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({
        ...newEvent,
        [name]: value,
    });
};

  const handleEditClick = (event) => {
    setEditEventData({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      notes: event.notes,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
        const config = {
            headers: {
                'x-token': localStorage.getItem('token'),
            },
        };
        await calendarApi.post('/events', newEvent, config);
        setShowCreateModal(false);
    } catch (error) {
        console.error('Error creating event:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
};

  return (
    <div>
      <h2>Contenidos</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.notes}</td>
              <td>{new Date(event.start).toLocaleString()}</td>
              <td>{new Date(event.end).toLocaleString()}</td>
              <td>{event.user.name}</td>
              <td>
                <button onClick={() => handleEditClick(event)}>
                  <i className="fa fa-edit"></i> Editar
                </button>
                <button onClick={handleDeleteClick}>
                  <i className="fa fa-trash"></i> Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Crear Botón */}
      <button onClick={handleCreateClick}>Crear Contenido</button>

      {/* Editar Modal */}
      <ReactModal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        style={customStyles}
      >
        <div>
          <h2>Editar Contenido</h2>
          <form>
            <label>Título:</label>
            <input type="text" value={editEventData.title} onChange={(e) => setEditEventData({...editEventData, title: e.target.value})} />
            <label>Inicio:</label>
            <input type="datetime-local" value={editEventData.start} onChange={(e) => setEditEventData({...editEventData, start: e.target.value})} />
            <label>Fin:</label>
            <input type="datetime-local" value={editEventData.end} onChange={(e) => setEditEventData({...editEventData, end: e.target.value})} />
            <label>Descripción:</label>
            <textarea value={editEventData.notes} onChange={(e) => setEditEventData({...editEventData, notes: e.target.value})} />
          </form>
        </div>
      </ReactModal>

      {/* Borrar Modal */}
      <ReactModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={customStyles}
      >
        <div>
          <h2>Borrar Contenido</h2>
          {/* Aquí va el contenido del modal de eliminación */}
        </div>
      </ReactModal>

      {/* Crear Modal */}
      <ReactModal
        isOpen={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
        style={customStyles}
      >
        <div>
          <h2>Crear Nuevo Contenido</h2>
          <form onSubmit={handleCreateEvent}>
            <label>Título:</label>
            <input type="text" />
            <label>Inicio:</label>
            <input type="datetime-local" />
            <label>Fin:</label>
            <input type="datetime-local" />
            <label>Descripción:</label>
            <textarea />
            <button type="submit">Guardar</button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};
