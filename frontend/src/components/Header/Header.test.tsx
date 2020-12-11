import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Header from './Header';

it('Header matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(<Header />);
  expect(result).toMatchSnapshot();
});