import { cn } from './utils';

describe('cn', () => {
  it('merges class names and trims', () => {
    expect(cn('a', undefined, 'b', false && 'x', null, 'c')).toBe('a b c');
  });
});


