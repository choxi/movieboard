import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { noop } from 'lodash';
import style from './style.scss';

/**
 * @name Slider
 * @prop {string} [lang] - Langage that code is written in (for syntax highlighting).
 *
 * @example
 * <Slider initialValue={ 0 } />
 *
 */
export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
  }

  render() {
    return (
      <div
        className='Slider'
        onClick={this.handleClick.bind(this)}
        {...this.props}
      >
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
    this.state.value = normalize(xPercent, this.props.min, this.props.max);
    this.props.onChange(this.state.value);
  }

  calculateLeft() {
    let numerator = this.state.value - this.props.min;
    let denominator = this.props.max - this.props.min;
    return numerator / denominator * 100;
  }
}

// Proptypes
// ----------------------------------------------------------------------------
Slider.propTypes = {
  // Callback for when the value changes.
  onChange: PropTypes.func,
  // The value for when the slider is at 0%
  min: PropTypes.number,
  // The value for when the slider is at 100%
  max: PropTypes.number,
  // The starting value
  initialValue: validateValue,
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
  let normalizedValue = floatValue * range + min;
  // cleverly restrict the value be between the min and max
  return [min, normalizedValue, max].sort()[1];
}

