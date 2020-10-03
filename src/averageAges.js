'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const mens = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );
  const menAvgAge = mens.reduce(
    (acc, person) => acc + (person.died - person.born), 0) / mens.length;

  return menAvgAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => withChildren
    ? people.some(children => children.mother === person.name)
    : person.sex === 'f'
  );
  const womenAvgAge = womens.reduce((acc, person) => acc + (
    person.died - person.born), 0) / womens.length;

  return womenAvgAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // eslint-disable-next-line max-len
  const mothers = people.filter(person => people.some(
    children => children.mother === person.name));

  const diffAge = [];

  if (onlyWithSon) {
    mothers.map(woman => people.map(person => {
      if (person.mother === woman.name && person.sex === 'm') {
        diffAge.push(person.born - woman.born);
      }
    }));
  } else {
    mothers.map(woman => people.map(person => {
      if (person.mother === woman.name) {
        diffAge.push(person.born - woman.born);
      }
    }));
  }

  return diffAge.reduce((sum, age) => sum + age, 0) / diffAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
