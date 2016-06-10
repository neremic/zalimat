jest.unmock('../src/components/ChartWithHeader.jsx');

import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ChartWithHeader from '../src/components/ChartWithHeader.jsx'

describe('CheckboxWithLabel', () => {

    it('changes the text after click', () => {
        const props = {
            dataSet : {},
            onDelete : {},
            viewPortDateRange : {}
        };

        const shallowRenderer = createRenderer();
        shallowRenderer.render(<ChartWithHeader {...props}/>);
        let output = shallowRenderer.getRenderOutput();

        console.log("output %O", output);
        //expect(true).to.equal(true);
        expect(true).toEqual(true);
    });

});
