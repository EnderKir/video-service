import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Spinner from './Spinner';

it('Spinner matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(<Spinner/>);
  expect(result).toMatchSnapshot();
});