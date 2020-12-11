import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import VideoCard from './VideoCard';

const videoData = {
  id: '55fd6d0a-2d16-4a6e-9114-a576bd68d375',
  url: '55fd6d0a-2d16-4a6e-9114-a576bd68d375.mp4',
  title: 'My title',
  description: 'My description'
};

it('VideoCard matches snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(
    <VideoCard
      id={videoData.id}
      description={videoData.description}
      title={videoData.description}
      url={videoData.url}
      setActive={() => {}}
      deleteFile={() => {}}
    />);
  expect(result).toMatchSnapshot();
});

it('VideoCard matches snapshot (active)', () => {
  const renderer = ShallowRenderer.createRenderer();
  const result = renderer.render(
    <VideoCard
      id={videoData.id}
      description={videoData.description}
      title={videoData.description}
      url={videoData.url}
      setActive={() => {}}
      deleteFile={() => {}}
      isActive
    />);
  expect(result).toMatchSnapshot();
});