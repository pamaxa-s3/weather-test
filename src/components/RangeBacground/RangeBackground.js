import React, { Component } from 'react'
import './RangeBackground.css'


export default class RangeBackground extends Component {

   state = {
      color: 'transparent'
   }

   onChangeHandler = (e) => {
      const tempVal = Math.floor(e.target.value)

      if (tempVal <= 50) {
         let r = Math.floor(0 + 255 * tempVal / 100 * 2)
         let g = Math.floor(255 - 8 * tempVal / 100 * 2)
         let b = Math.floor(255 - 255 * tempVal / 100 * 2)

         this.setState({
            color: `rgb(${r},${g},${b})`
         })
      }

      if (tempVal > 50) {

         let r = 255
         let g = (247 - 106 * tempVal / 100)
         let b = 0
         this.setState({
            color: `rgb(${r},${g},${b})`
         })
      }
   }

   render() {
      return (
         <div style={{ background: this.state.color }} className='RangeBackground'>
            <label htmlFor="customRange2" className="form-label">Weather`s color background</label>
            <input type="range" className="form-range" min="0" max="100" id="customRange2" onChange={this.onChangeHandler}></input>
            <div>

            </div>
         </div>
      )
   }
}
