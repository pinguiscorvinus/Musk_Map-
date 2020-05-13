import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CityCountyData from '../jsondata/CityCountyData.json'
import { passcurrentcity } from '../action/muskmapaction'
//import sweetaler
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export class Datanavbar extends React.Component {
  //redux sent data
  selectcity = (city)=>{
    this.props.passcurrentcity(city)
  }

  // function selectcityareas() {
  //     if (currentcity !== 'home') {
  //       cityareas = CityCountyData.filter(
  //         (area) => area.CityName === currentcity
  //       )
  //       console.log(cityareas)
  //     } else {
  //       Swal.fire('請先選擇縣市')
  //       console.log('ERROR~~~~')
  //     }
  //   }
  render() {
    console.log(this.props)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark muskmapNavbar">
          <Link className="navbar-brand" to="/home">
            試作口罩地圖
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  全國口罩地圖
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  to="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  選擇縣市
                </Link>
                <div className="dropdown-menu selectcity">
                  {CityCountyData.map((value, index) => {
                    return (
                      <Link
                        role="button"
                        key={index}
                        className="dropdown-item"
                        onClick={()=>{this.selectcity(value.CityName)}}
                      >
                        {value.CityName}
                      </Link>
                    )
                  })}
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  type="button"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.selectcityareas}
                >
                  選擇鄉鎮
                </a>
                <div className="dropdown-menu selectcity">
                  {CityCountyData.map((value, index) => {
                    return (
                      <Link
                        key={index}
                        className="dropdown-item"
                        to={value.CityEngName}
                      >
                        {value.CityName}
                      </Link>
                    )
                  })}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
// 取得Redux中store的值
const mapStateToProps = (store) => {
  return { passlocationdata: store.muskmapreducer.passlocationdata }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ passcurrentcity,passcurrentcity }, dispatch)
         
}
// 指示dispatch要綁定哪些action creators
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Datanavbar))
