import interp1 from "../src/interp1"

describe('interp1', () => {
  it('interp1 exists', () => {
    expect(interp1).toBeTruthy();
  });

  it('throws an error if the number of sample points does not equal the number of values', () => {
    expect(() => {
      interp1([1, 2, 3], [1, 2, 3, 4], [2, 2.5, 3]);
    }).toThrowError();
  });

  it('throws an error if two values from reference space occur more than once', () => {
    expect(() => {
      interp1([5, 5, 8], [8, -3, 0], [6]);
    }).toThrowError();
  });

  it('throws an error if query points lie outside of sample points range', () => {
    expect(() => {
      interp1([-5, 0, 7], [3, 9, -8], [-6]);
    }).toThrowError();

    expect(() => {
      interp1([2, 4, 5], [-2, 4, -3], [7]);
    }).toThrowError();
  });

  it('returns an empty array for empty query points', () => {
    expect(interp1([], [], [])).toEqual([]);

    expect(interp1([7, 8, 9], [-5, 9, 81], [])).toEqual([]);
  });

  it('returns exact values', () => {
    expect(interp1(
      [-8, 0, 5],
      [1, 92, 4],
      [-8, 5, 0]
    )).toEqual([1, 4, 92]);
  });

  it('interpolates values linearly', () => {
    expect(interp1(
      [-7, -3, 0, 4, 9],
      [0, 8, -4, -2, 3],
      [-7, -5, -3, -1.5, 0, 2, 4, 6.5, 9]
    )).toEqual([0, 4, 8, 2, -4, -3, -2, 0.5, 3]);
  });

  it('does not require the sample points to be in order', () => {
    expect(interp1(
      [9, -2, 0, 3],
      [8, 0, 3, 1],
      [-2, 0, 1.5, 3]
    )).toEqual([0, 3, 2, 1]);
  })
});
