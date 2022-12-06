// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { useEffect } from 'react'


// const ErrMess = props => {
//     const errTitle = {
//         mess: 'Vui lòng nhập đầy đủ thông tin',
//         submit: 'ok'
//     }

//     const setHideShowErr = () => {
//         const mainErr = document.querySelector('.err__message');
//         mainErr.classList.remove('err__message__active');
//     }

//     console.log(props.showErr);
//     return (
//         <div className={`err__message ${props.showErr ? 'err__message__active' : ''}`}>
//             <div>
//                 <div className="err__message__title">{errTitle.mess}</div>
//                 <div className="err__message__submit" onClick={() => setHideShowErr()}>{errTitle.submit}</div>
//             </div>
//         </div>
//     )
// }

// ErrMess.propTypes = {
//     showErr: PropTypes.bool.isRequired,
// }

// export default ErrMess