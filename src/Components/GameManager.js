import React, { useEffect, useState } from "react";
import Deck from './Deck'
import shuffle, {getPokemonIdFromImgUrl} from '../HelperFunctions'
import GameStats from "./GameStats";

export default function GameManager() {
  const [pokemons, setPokemons] = useState([])
  function generatePokemons(pokemons) {
    const arr = shuffle(pokemons).map((pokemon,idx)=> idx<10 && pokemon)
    const arrClone = shuffle([...arr])
    const combinedArr = shuffle(arr.concat(arrClone).filter(pokemon=> pokemon))
    setPokemons(combinedArr)
  }
  useEffect(()=> {
    function fetchPokemons() {
      const pokemonUrls = []
      const pokemonImages = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
        .then(resp => resp.json())
        .then(pokemons => {
          pokemons.results.forEach(pokemon => {
            pokemonUrls.push(pokemon.url)
          })
          return pokemonUrls.map(url=>
           fetch(url)
            .then(resp=>resp.json())
            .then(pokemonUrl => pokemonUrl.sprites.other.dream_world.front_default)
          )
        })
      Promise.resolve(pokemonImages)
      .then((pokemonImages)=>Promise.all(pokemonImages)
        .then((pokemonImages)=>generatePokemons(pokemonImages)))
    }
   fetchPokemons()
  },[])
  
  const [isCardOpen, setIsCardOpen] = useState(new Array(20).fill(false))
  const [pairIndexes, setPairIndexes] = useState([])
  const [moves, setMoves] = useState(0)
  const [disableCardIndicator, setDisableCardIndicator] = useState(0)
  
  function handleClick (e,index) {
    setMoves(moves + 0.5)
    setDisableCardIndicator(disableCardIndicator + 1)
    const copyOfIsCardOpen = [...isCardOpen]
    copyOfIsCardOpen[index]=true
    setIsCardOpen(copyOfIsCardOpen)
    setPairIndexes(pairIndexes.concat(index))
    appendClickedCard(e)
  }
  const [matchingPairs, setMatchingPairs] = useState([])
  function appendClickedCard(e) {
    setMatchingPairs(matchingPairs.concat(getPokemonIdFromImgUrl(e)))
  }
  useEffect(()=> {
    const matchCards = () => {
      const copyOfIsCardOpen = [...isCardOpen]
      if (matchingPairs.length >= 2 && matchingPairs.length % 2 === 0) {
        setTimeout(()=>setDisableCardIndicator(0),500)
        if ((pairIndexes.length >= 2 && 
            pairIndexes[pairIndexes.length-1]===pairIndexes[pairIndexes.length-2]) || 
            matchingPairs[matchingPairs.length-1] !== matchingPairs[matchingPairs.length-2] ) {
          setMatchingPairs(matchingPairs.slice(0,-2))
          copyOfIsCardOpen[pairIndexes[pairIndexes.length-1]] = false
          copyOfIsCardOpen[pairIndexes[pairIndexes.length-2]] = false
          setTimeout(()=>setIsCardOpen(copyOfIsCardOpen),500)
          setPairIndexes(pairIndexes.slice(0,-2))
        } 
      }
    }
    matchCards()
  },[matchingPairs, isCardOpen, pairIndexes, disableCardIndicator])
  
  
  return (
    <>
      <GameStats moves={moves}/>
      <Deck pokemons={pokemons} 
            handleClick={handleClick} 
            isCardOpen={isCardOpen} 
            moves={moves}
            disableCardIndicator={disableCardIndicator}/>
    </>
  )
}