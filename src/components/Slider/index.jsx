import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { noop } from 'lodash';
import style from './style.scss';


export default class Slider extends React.Component {
  render() {
    return (
      <div className='Slider' onClick={this.handleClick.bind(this)}>
        <div
          className='handle'
          style={{left: `${this.calculateLeft()}%`}}>
        </div>
        <div className='track'></div>
      </div>
    );
  }

  handleClick(e) {
    let node = ReactDOM.findDOMNode(this);
    let {clientX, clientY} = e;
    let {offsetLeft, offsetWidth} = node;
    let xPercent = (clientX - offsetLeft) / offsetWidth;
    this.props.onChange(normalize(xPercent, this.props.min, this.props.max));
  }

  calculateLeft() {
    let numerator = this.props.value - this.props.min;
    let denominator = this.props.max - this.props.min;
    return numerator / denominator * 100;
  }
}

// Proptypes
// ----------------------------------------------------------------------------
Slider.propTypes = {
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  value: validateValue,
}

Slider.defaultProps = {
  onChange: noop,
  min: 0,
  max: 100,
}

// Custom Validation
// ----------------------------------------------------------------------------
function validateValue(props, propName, componentName) {
  let value = props[propName];

  if (typeof(value) !== 'number') {
    return new Error(`value must be a number, got ${typeof(value)}`);
  }

  if (value > props.max || value < props.min) {
    return new Error(
      `value: ${value} must be between max: ${props.max}
      and min: ${props.min}`
    );
  }
}

// Helpers
// ---------------------------------------------------------------------------

function normalize(floatValue, min, max) {
  let range = max - min;
  return floatValue * range + min;
}

