import "./CountrySelect.scss";
import React, { ReactDOM } from "react";
import Globe from "../../assets/icons/globe_9811840.svg";
import PushPin from "../../assets/icons/placeholder_220528.svg";
import Plain from "../../assets/icons/mail_651035.svg";
import PlainTwo from "../../assets/icons/paper-plane_3247958.svg";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

// const PageCover = React.forwardRef((props, ref) => {
//   return (
//     <div className="page page-cover" ref={ref} data-density="hard">
//       <div className="page-content">
//         <div className="travel-diary">
//           <p className="travel-diary__title">Travel Diary</p>
//         </div>
//         <img className="country-select__diary-image" src={Diary} alt="Diary" />
//       </div>
//     </div>
//   );
// });

// const SecondPage = React.forwardRef((props, ref) => {
//   const navigate = useNavigate();
//   const handleClickMarker = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <div className="page second-page" ref={ref}>
//       <div className="page-content">
//         <h1 className="first-page__title">Where are you going?</h1>
//         <img className="country-select__globe-image" src={Globe} alt="Globe" />
//         <img
//           className="country-select__pin-image"
//           src={PushPin}
//           alt="Push Pin"
//           onClick={handleClickMarker}
//         />
//       </div>
//     </div>
//   );
// });

// class YourComponent extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       page: 0,
//       totalPage: 0,
//     };
//   }

//   render() {
//     return (
//       <div>
//         <HTMLFlipBook
//           width={550}
//           height={1500}
//           size="stretch"
//           minWidth={315}
//           maxWidth={1000}
//           minHeight={400}
//           maxHeight={1533}
//           maxShadowOpacity={0.5}
//           showCover={false}
//           mobileScrollSupport={true}
//           onFlip={this.onPage}
//           className="demo-book"
//           ref={(el) => (this.flipBook = el)}
//         >
//           <PageCover></PageCover>
//           <SecondPage />
//         </HTMLFlipBook>
//       </div>
//     );
//   }
// }

// export default YourComponent;

export default function CountrySelect() {
  const navigate = useNavigate();
  const handleClickMarker = () => {
    navigate("/dashboard");
  };
  return (
    <main>
      <div className="country-select">
        <img className="country-select__globe-image" src={Globe} alt="Globe" />
        <img
          className="country-select__pin-image"
          src={PushPin}
          alt="Push Pin"
          onClick={handleClickMarker}
        />
        <img className="country-select__plain-image-two" src={PlainTwo} alt="" />
        <img className="country-select__plain-image" src={Plain} alt="" />
      </div>
    </main>
  );
}
