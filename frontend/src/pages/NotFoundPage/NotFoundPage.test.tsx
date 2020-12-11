import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import NotFoundPage from './NotFoundPage';

it('NotFoundPage matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(<NotFoundPage/>);
  expect(result).toMatchSnapshot();
});
