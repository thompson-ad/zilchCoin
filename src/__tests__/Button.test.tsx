import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Button from '../components/Button';

test('Renders the passed lable', () => {
  const {getByText} = render(<Button text={'Test label'} />);
  expect(getByText('Test label')).not.toBeNull();
});

test('Can press the button', () => {
  const onPressMock = jest.fn();
  const {getByText} = render(
    <Button text={'Test label'} onPress={onPressMock} />,
  );

  fireEvent.press(getByText('Test label'));
  expect(onPressMock).toHaveBeenCalled();
  expect(onPressMock.mock.calls.length).toBe(1);
});
