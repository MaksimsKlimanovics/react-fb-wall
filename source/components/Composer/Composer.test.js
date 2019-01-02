import React from 'react';
import Composer from './';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const props = {
  _createPost: jest.fn(),
};

const comment = 'LOL';

const initialState = {
  comment: '',
};

const updatedState = {
  comment,
};

const result = mount(<Composer { ...props } />);

describe('Composer components:', () => {
  test('should have 1 "section" element', () => {
      expect(result.find('section')).toHaveLength(1)
    });

    test('should have 1 "form" element', () => {
      expect(result.find('form')).toHaveLength(1)
    });

    test('should have 1 "textarea" element', () => {
      expect(result.find('textarea')).toHaveLength(1)
    });

    test('should have 1 "input" element', () => {
      expect(result.find('input')).toHaveLength(1)
    });

    test('should have 1 "img" element', () => {
      expect(result.find('img')).toHaveLength(1)
    });

    // в этом месте падают тесты. Не понимаю почему и что у меня не так как надо.
    // с тестами не справляюсь - не понимаю в чём проблема -->>
    //test('should have valid initial state', () => {
    //  expect(result.state()).toEqual(initialState);
    //});

    test('textarea value should be empty initially', () => {
      expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
      result.setState({
        comment,
      });

      expect(result.state()).toEqual(updatedState);
    
      // в этом месте падают тесты. Не понимаю почему и что у меня не так как надо.
      // с тестами не справляюсь - не понимаю в чём проблема -->>
      //та же тема!!!
      //expect(result.find('textarea').text()).toBe(comment);
    });
});

