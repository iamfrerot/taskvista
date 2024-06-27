import { TouchableOpacity, Text } from "react-native";

const FilterButton = ({
 label,
 value,
 setValue,
 filter,
}: {
 label: string;
 value: string;
 setValue: (value: string) => void;
 filter: string;
}) => (
 <TouchableOpacity
  className={`rounded-lg py-2 px-3 mx-1 my-1 ${
   filter === value ? "bg-primary" : "bg-gray-100"
  }`}
  onPress={() => setValue(value)}
 >
  <Text
   className={`font-semibold text-sm ${
    filter === value ? "text-white-100" : "text-gray-800"
   }`}
  >
   {label}
  </Text>
 </TouchableOpacity>
);

export default FilterButton;
