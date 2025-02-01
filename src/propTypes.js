import PropTypes from "prop-types";

export const todoObjType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completedAt: PropTypes.string,
  icon: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  temp: PropTypes.bool
}