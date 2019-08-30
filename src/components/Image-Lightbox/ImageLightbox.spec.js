import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ImageLightbox from './ImageLightbox';

describe('ImageLightbox', () => {

    const images = [
        { id: '28420720169', owner: '59717246@N05', secret: 'd460443ecb', server: '4722', farm: 5 },
        { id: '39489067804', owner: '132444237@N06', secret: 'befff859cf', server: '4658', farm: 5 },
        { id: '26327535078', owner: '51483961@N03', secret: '5f30961f45', server: '4702', farm: 5 },
        { id: '40166902122', owner: '150995138@N06', secret: '2b46fdb817', server: '4716', farm: 5 },
        { id: '39301783895', owner: '156204685@N03', secret: '475b6645b9', server: '4761', farm: 5 },
        { id: '39301758945', owner: '28549294@N05', secret: 'e6ccd03a1b', server: '4719', farm: 5 }
    ];

    let wrapper;
    const props = {
        images: images,
        startIndex: 3
    }
    const initialState = {
        currentIndex: props.startIndex
    }

    const mountImage = () => {
        return shallow(
            <ImageLightbox startIndex={props.startIndex} images={props.images} />,
            { lifecycleExperimental: true, attachTo: document.createElement('div') }
        );
    };

    beforeEach(() => {
        wrapper = mountImage();
    });

    it('render 3 icons on component', () => {
        expect(wrapper.find('FontAwesome').length).to.equal(3);
    });

    it('shows selected picture by index', () => {
        wrapper.setState(initialState, () => {
            expect(wrapper.find('img').prop('src')).to.be.equal('https://farm5.staticflickr.com/4716/40166902122_2b46fdb817.jpg');
        })
    });

    it('checks start index within images array bounds', () => {
        wrapper.setState(initialState, () => {
            expect(wrapper.state().currentIndex).to.be.within(0, wrapper.instance().props.images.length);
        })
    });

    it('checks navigation buttons', () => {
        wrapper.setState({ currentIndex: 4 }, () => {
            wrapper.instance().next();
            expect(wrapper.state().currentIndex).to.be.equal(5);
            wrapper.instance().prev();
            expect(wrapper.state().currentIndex).to.be.equal(4);
        })
    });

    it('checks navigation does not exceeds images length', () => {
        wrapper.setState({ currentIndex: 5 }, () => {
            wrapper.instance().next();
            expect(wrapper.state().currentIndex).to.be.equal(5);
            wrapper.setState({ currentIndex: 0 }, () => {
                wrapper.instance().prev();
                expect(wrapper.state().currentIndex).to.be.equal(0);
            })
        })
    });
});
