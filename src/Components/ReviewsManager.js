import React, { useState } from "react"
import Review from "./Review"
import ReviewsFilter from "./ReviewsFilter"
import { bigStars } from "../HelperFunctions"

export default function ReviewsManager({ reviews }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [starsFilter, setStarsFilter] = useState("All")

  function calculateAvgRating() {
    const ratingsSum = reviews
      .map((review) => review.rating)
      .reduce((acc, curr) => acc + curr)
    const ratingsAvg = Math.round((ratingsSum / reviews.length) * 2) / 2

    switch (ratingsAvg) {
      case 0:
        return bigStars.zero
      case 0.5:
        return bigStars.halfToOne
      case 1:
        return bigStars.one
      case 1.5:
        return bigStars.halfToTwo
      case 2:
        return bigStars.two
      case 2.5:
        return bigStars.halfToThree
      case 3:
        return bigStars.three
      case 3.5:
        return bigStars.halfToFour
      case 4:
        return bigStars.four
      case 4.5:
        return bigStars.halfToFive
      default:
        return bigStars.five
    }
  }

  function handleCheckboxChange(e) {
    if (e.target.checked) {
      setIsCheckboxChecked(true)
    } else setIsCheckboxChecked(false)
  }

  function handleStartsFilter(e) {
    if (e.target.value === null || e.target.value === "All") {
      setStarsFilter("All")
    } else {
      setStarsFilter(parseInt(e.target.value))
    }
  }

  function renderReviews() {
    if (isCheckboxChecked && starsFilter === "All") {
      return reviews.map((review, idx) => <Review key={idx} review={review} />)
    } else if (isCheckboxChecked && starsFilter !== "All") {
      return reviews
        .filter((review) => review.rating === starsFilter)
        .map((review, idx) => <Review key={idx} review={review} />)
    } else if (!isCheckboxChecked && starsFilter === "All") {
      return reviews
        .map((review, idx) => <Review key={idx} review={review} />)
        .reverse()
    } else if (!isCheckboxChecked && starsFilter !== "All") {
      return reviews
        .filter((review) => review.rating === starsFilter)
        .map((review, idx) => <Review key={idx} review={review} />)
        .reverse()
    }
  }

  return (
    <>
      <h1>
        <b>Reviews</b>
      </h1>
      {
        <ReviewsFilter
          handleCheckboxChange={handleCheckboxChange}
          handleStartsFilter={handleStartsFilter}
        />
      }
      <div className="average-rating">{calculateAvgRating()}</div>
      <div className="reviews-container">{renderReviews()}</div>
    </>
  )
}