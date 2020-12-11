import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HomePage from './HomePage';

it('HomePage matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(<HomePage/>);
  expect(result).toMatchSnapshot();
});
