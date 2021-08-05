import React from 'react'
import Rating from './Rating'
import { bigStars } from '../HelperFunctions'

export default function RatingsContainer({ratings}) {
  function calculateAvgRatingV2() {
    const ratingsSum = ratings.map(rating => rating.rating).reduce((acc, curr) => acc+curr)
    const ratingsAvg = Math.round(ratingsSum/ratings.length*2)/2
    
    switch (ratingsAvg) {
      case 0 : return bigStars.zero
      case 0.5 : return bigStars.halfToOne 
      case 1 : return bigStars.one
      case 1.5 : return bigStars.halfToTwo
      case 2 : return bigStars.two
      case 2.5 : return bigStars.halfToThree
      case 3 : return bigStars.three
      case 3.5 : return bigStars.halfToFour
      case 4 : return bigStars.four
      case 4.5 : return bigStars.halfToFive
      default : return bigStars.five
    }
  } 
  
  // function calculateAvgRating() {
  //   const ratingsSum = ratings.map(rating => rating.rating).reduce((acc, curr) => acc+curr)
  //   const ratingsAvg = Math.round(ratingsSum/ratings.length*2)/2
  //   const solidStar = <i className="fas fa-star fa-3x"></i>
  //   const regularStar = <i className="far fa-star fa-3x"></i>
  //   const halfStar = <i className="fas fa-star-half-alt fa-3x"></i>
    
  //   switch (ratingsAvg) {
  //     case 0 : return new Array(5).fill(regularStar)
  //     case 0.5 : return new Array(1).fill(halfStar).concat(new Array(4).fill(regularStar)) 
  //     case 1 : return new Array(1).fill(solidStar).concat(new Array(4).fill(regularStar)) 
  //     case 1.5 : return new Array(1).fill(solidStar).concat(new Array(1).fill(halfStar)).concat(new Array(3).fill(regularStar))
  //     case 2 : return new Array(2).fill(solidStar).concat(new Array(3).fill(regularStar)) 
  //     case 2.5 : return new Array(2).fill(solidStar).concat(new Array(1).fill(halfStar)).concat(new Array(2).fill(regularStar))
  //     case 3 : return new Array(3).fill(solidStar).concat(new Array(2).fill(regularStar)) 
  //     case 3.5 : return new Array(3).fill(solidStar).concat(new Array(1).fill(halfStar)).concat(new Array(1).fill(regularStar))
  //     case 4 : return new Array(4).fill(solidStar).concat(new Array(1).fill(regularStar)) 
  //     case 4.5 : return new Array(4).fill(solidStar).concat(new Array(1).fill(halfStar))
  //     default : return new Array(5).fill(solidStar)
  //   }
  // }
  
  return (
    <>
      <h1><b>Ratings</b></h1>
      <div className="average-rating">
        {calculateAvgRatingV2()}
      </div>
      <div className="ratings-container">
        {ratings.map((rating, idx) => <Rating key={idx} rating={rating}/>)}
      </div>
    </>
  )
}