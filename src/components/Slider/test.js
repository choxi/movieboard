import Slider from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';

describe('Slider', function() {
  describe('initial render', function() {
    it('renders handle', function() {
      let component = renderIntoDocument(
        <Slider min={0} max={100} initialValue={50} />
      );

      let handle = findRenderedDOMComponentWithClass(component, 'handle');

      expect(handle.style.left).to.eql('50%')
    });

    it('normalizes range', function() {
      const component = renderIntoDocument(
        <Slider min={100} max={200} initialValue={120} />
      );

      const handle = findRenderedDOMComponentWithClass(component, 'handle');

      expect(handle.style.left).to.eql('20%')
    });
  });


  describe('click', function() {
    it('triggers the onChange callback', function() {
      const onChange = sinon.spy();
      const component = renderIntoDocument(
        <Slider min={100} max={200} initialValue={120} onChange={onChange} />
      );

      const track = findRenderedDOMComponentWithClass(component, 'track');

      Simulate.click(track, {clientY: 0, clientX: 100})
      expect(onChange).to.have.been.calledWith(200);
    });
  });
});
