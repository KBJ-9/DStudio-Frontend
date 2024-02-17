import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( MultimediaEvent ) => {
        dispatch( onSetActiveEvent( MultimediaEvent ) )
    }

    const startSavingEvent = async( MultimediaEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if( MultimediaEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...MultimediaEvent }) );
        } else {
            // Creando
            dispatch( onAddNewEvent({ ...MultimediaEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeletingEvent = () => {
        // Todo: Llegar al backend


        dispatch( onDeleteEvent() );
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
