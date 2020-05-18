import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CityCountyData from '../jsondata/CityCountyData.json'
import { passcurrentcity, passcurrentarea } from '../action/muskmapaction'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
//import sweetaler
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export class Datanavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentcitysarealist: [],
    }
  }
  //redux sent data
  selectcity = (city) => {
    this.props.passcurrentcity(city)
  }
  selectarea = (area) => {
    this.props.passcurrentarea(area)
  }
  render() {
    let currentcitysarea = []
    let selectedcity = this.props.passlocationdata.currentcity
    let currentcitysareas = () => {
      if (selectedcity !== 'Nation') {
        currentcitysarea = CityCountyData.filter(
          (area) => area.CityName === selectedcity
        )
        this.setState((prevState, props) => ({
          currentcitysarealist: currentcitysarea[0].AreaList,
        }))
      } else {
        Swal.fire('請先選擇縣市')
      }
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg" className="muskmapNavbar">
          <Navbar.Brand>試作口罩地圖</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="nav-items">全國口罩地圖</Nav.Link>
              <NavDropdown
                title="選擇縣市"
                id="basic-nav-dropdown"
                className="nav-items"
              >
                <div className="selectcity">
                  {CityCountyData.map((value, index) => {
                    return (
                      <NavDropdown.Item
                        role="button"
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          this.selectcity(value.CityName)
                          this.selectarea('Unset')
                        }}
                      >
                        {value.CityName}
                      </NavDropdown.Item>
                    )
                  })}
                </div>
              </NavDropdown>
              <NavDropdown
                title="選擇鄉鎮"
                id="basic-nav-dropdown"
                className="nav-items"
                onClick={() => {
                  currentcitysareas()
                }}
              >
                <div className="selectcity">
                  {this.state.currentcitysarealist.map((value, index) => {
                    return (
                      <NavDropdown.Item
                        role="button"
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          this.selectarea(value.AreaName)
                        }}
                      >
                        {value.AreaName}
                      </NavDropdown.Item>
                    )
                  })}
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
// 取得Redux中store的值
const mapStateToProps = (store) => {
  return { passlocationdata: store.muskmapreducer.passlocationdata }
}
// 指示dispatch要綁定哪些action creators
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ passcurrentcity, passcurrentarea }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Datanavbar)
