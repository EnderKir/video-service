import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DragAndDrop from './DragAndDrop';

it('DragAndDrop matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(<DragAndDrop handleFileChange={() => {}} />);
  expect(result).toMatchSnapshot();
});