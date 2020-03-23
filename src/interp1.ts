const zip = require('lodash/zip');

/**
 * Point data type.
 */
type Point = [number, number];

/**
 * Interpolates values linearly in one dimension.
 * @param  xs  Array of sample points in reference space.
 * @param  ys  Array of values y(x) in feature space with length equal to xs.
 * @param  xqs Array of query points in reference space. 
 * @return     Interpolated values yq(xq) in feature space with length equal to xqs.
 */
export default function interp1(
  xs: number[],
  ys: number[],
  xqs: number[],
): number[] {
  /*
   * Throws an error if number of sample points in reference space does not
   * equal number of values in feature space
   */
  if (xs.length !== ys.length) {
    throw new Error(
      `Arrays of sample points xs and corresponding values ys have to
      have equal length.`
    );
  }

  /* Combine x and y arrays. */
  const points: Point[] = zip(xs, ys) as Point[];

  /* Sort points by x value in ascending order. */
  points.sort((a, b) => {
    const diff: number = a[0] - b[0];

    /* Check if one x value occurs twice. */
    if (diff === 0) {
      throw new Error(`Two sample points x with same value ` + a[0] + `. This
          is not allowed`);
    }

    return diff;
  });

  /* Interpolate values */
  let yqs: number[] = xqs.map(xq => {
    /* Determine previous and next points. */
    // TODO: Put to helper function?
    let prev: Point | undefined = undefined;
    let next: Point | undefined = undefined;
    for (let i: number = 0; i < points.length; i++) {
      const point: Point = points[i];
      if (point[0] <= xq) prev = point;
      if (point[0] >= xq) next = point;
      if (prev !== undefined && next !== undefined) break;
    }

    /* Check if value lies in interpolation range. */
    if (prev === undefined || next === undefined) {
      throw new Error(`Query value ` + xq + ` lies outside of range and
          extrapolation is not supported.`);
    }

    /* Return exact value. */
    if (prev === next) return prev[1];

    /* Interpolate value. */
    // TODO: Put to helper function.
    const diff: number = next[0] - prev[0];
    const lambda: number = (xq - prev[0]) / diff;
    return (1 - lambda) * prev[1] + lambda * next[1];
  });

  /* Return result. */
  return yqs;
}
