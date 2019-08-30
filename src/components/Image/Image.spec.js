// import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Image from './Image.js';

describe('Image', () => {

  const sampleImage = { id: '28420720169', owner: '59717246@N05', secret: 'd460443ecb', server: '4722', farm: 5 };
  
  let wrapper;
  const initialState = {
    rotationValue: 0
  }

  const mountImage = () => {
    return shallow(
      <Image dto={sampleImage} />,
      { lifecycleExperimental: true, attachTo: document.createElement('div') }
    );
  };

  beforeEach(() => {
    wrapper = mountImage();
  });

  it('render 3 icons on each image', () => {
    expect(wrapper.find('FontAwesome').length).to.be.equal(3);
  });


  //Tasks Features Tests
  it('has initial rotation value of 0', () => {
    wrapper.setState(initialState, () => {
      expect(wrapper.find('.image-root').prop('style')).to.have.property('transform', 'rotate(0deg)');
    });
  });

  it('should be marked as draggable', () => {
    wrapper.setState(initialState, () => {
      expect(wrapper.find('.image-root').prop('draggable')).to.be.equal('true');
    });
  });

  it('changes rotation value by 90 degrees', () => {
    wrapper.setState(initialState, () => {
      wrapper.instance().rotateImage()
      expect(wrapper.find('.image-root').prop('style')).to.have.property('transform', 'rotate(90deg)');
    });
  });
});

