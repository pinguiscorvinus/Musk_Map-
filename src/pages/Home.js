import React, { Component } from 'react'

import Datanavbar from '../components/Datanavbar'

import Map from '../components/Map'

import '../scss/muskmapscss.scss'

export class Home extends Component {
  render() {
    return (
      <>
      <div>
        <Datanavbar />
        <div className="tmapcontaner">
          <Map />
        </div>
      </div>
      </>
    )
  }
}

export default Home
