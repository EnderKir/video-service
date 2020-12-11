import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import UploadPage from './UploadPage';

it('UploadPage matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(<UploadPage/>);
  expect(result).toMatchSnapshot();
});
