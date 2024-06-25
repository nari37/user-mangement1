


import React, { useEffect, useRef, useState } from 'react';
import '../slidercommponents/slider.css'; 
import { FaUsers } from "react-icons/fa";

const allStudentsData = [
    { profile: 'profile1.jpg', name: 'John Doe', rollNumber: '12345' },
    { profile: 'profile2.jpg', name: 'Jane Smith', rollNumber: '67890' },
    { profile: 'profile2.jpg', name: 'Jane Smith', rollNumber: '67890'}
    
  ];

export default function SliderComponent() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Handle button click
  function changeColor(button, contentId) {
    // Remove 'active' class from all buttons
    var buttons = document.querySelectorAll('.slider button');
    buttons.forEach(function(btn) {
      btn.classList.remove('active');
    });
  
    // Add 'active' class to the clicked button
    button.classList.add('active');
  
    // Hide all cards
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
      card.classList.remove('active');
    });
  
    // Show only the card corresponding to the clicked button
    var selectedCard = document.querySelector('.' + contentId);
    selectedCard.classList.add('active');
  
    // Scroll the cards container to the selected card
    var cardsContainer = document.querySelector('.cards-container');
    cardsContainer.scrollLeft = selectedCard.offsetLeft - cardsContainer.offsetLeft;
  }
  

  // JavaScript to synchronize scrolling between buttons and cards
  const syncScroll = () => {
    const slider = document.getElementById('slider');
    const cardsContainer = document.querySelector('.cards-container');

    // If the cards container is scrolled, update the slider and activate the corresponding button
    cardsContainer.addEventListener('scroll', () => {
      slider.scrollLeft = cardsContainer.scrollLeft;

      // Find the index of the visible card in the cards container
      const visibleCardIndex = Math.round(cardsContainer.scrollLeft / cardsContainer.offsetWidth);

      // Remove 'active' class from all buttons
      const buttons = document.querySelectorAll('.slider button');
      buttons.forEach(btn => {
        btn.classList.remove('active');
      });

      // Add 'active' class to the corresponding button based on the visible card index
      buttons[visibleCardIndex].classList.add('active');

      // Wait until scrolling stops, then activate the button corresponding to the maximum width element
      clearTimeout(cardsContainer.timeout);
      cardsContainer.timeout = setTimeout(() => {
        const maxWidthElement = document.querySelector('.card:nth-child(' + (visibleCardIndex + 1) + ')');
        const correspondingButton = document.querySelector('.slider button:nth-child(' + (visibleCardIndex + 1) + ')');
        changeColor(correspondingButton, maxWidthElement.classList[1]);
      }, 1000); // Adjust the timeout duration as needed
    });

    // If the slider is scrolled, update the cards container
    slider.addEventListener('scroll', () => {
      cardsContainer.scrollLeft = slider.scrollLeft;
    });
  };

  useEffect(() => {
    syncScroll();
  }, []);

  return (
    <center>
      <div className='slider' id="slider" ref={sliderRef}>
      <button onClick={(e) => changeColor(e.target, 'div1')} className={activeButtonIndex === 0 ? 'active' : ''}><FaUsers style={{marginRight:'10px',fontSize:'1.5rem'}} />All Students</button>
<button onClick={(e) => changeColor(e.target, 'div2')} className={activeButtonIndex === 1 ? 'active' : ''}>Student Tasks</button>
<button onClick={(e) => changeColor(e.target, 'div3')} className={activeButtonIndex === 2 ? 'active' : ''}>Give Marks</button>

      </div>

      <div className="cards-container" onScroll={syncScroll} ref={cardsContainerRef}>
        <div className='card div1' >{allStudentsData.map((item)=>{
            return(<>
            <div style={{display:'flex',flexDirection:'row'}}>
            {item.name}
            </div>
            </>)
        })}</div>
        <div className='card div2'>JavaScript</div>
        <div className='card div3'>CSS</div>
      </div>
    </center>
  );
}




