/**
 * Returns diffrence between previous and current date in minutes
 * @param lastDate
 */
export const timeSinceInMinutes = (lastDate: Date): number => {
  const currentTime = new Date();
  const diffInSecs =
    (currentTime.getTime() - new Date(lastDate).getTime()) / 1000;

  return Math.round(diffInSecs / 60);
};
