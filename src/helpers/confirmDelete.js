import { confirmAlert } from "react-confirm-alert";
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./colors";

// export const confirmDelete = (contactId, contactFullname) => {
  export const confirmDelete = (id, title, name, callback) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div
          dir='rtl'
          style={{backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: '1rem'}}
          className='p-4'  
        >
          <h1 style={{color: YELLOW}}>پاک کردن {title}</h1>
          <p style={{color: FOREGROUND}}>
            مطمنئنی که میخوای {title} {name} را پاک کنی؟
          </p>
          <button
            onClick={() => {
              callback(id);
              onClose();
            }}
            className='btn mx-2'
            style={{backgroundColor: PURPLE}}
          >مطمئن هستم</button>
          <button
            onClick={onClose}
            className='btn'
            style={{backgroundColor: COMMENT}}
          >انصراف</button>
        </div>
      )
    }
  })
}