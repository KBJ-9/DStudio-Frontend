import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, MultimediaEvent, MultimediaModal, FabAddNew, FabDelete} from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }



  return (
    <>
      <Navbar />


      <MultimediaModal />
      
      <FabAddNew />
      <FabDelete />


    </>
  )
}
