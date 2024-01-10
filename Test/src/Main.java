import java.sql.SQLOutput;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class Main {

    /*
    *
    * Write a function that given a string can find the first non repeating character in the string.

        Note: the string input will always be lowercase letters

        Example:

        Input:
        *
        Output: b

    * */
    public static void main(String[] args) {
        // test case 1 - populated string
        String input = "aabc";
        System.out.println(findNonRepeating(input));

        // test case 1 - populated string
        String empty = "";
        System.out.println(findNonRepeating(empty));

        // test case 3 - "abcde" -> a
        String allUnique = "abcde";
        System.out.println(findNonRepeating(allUnique));
    }

    // [
    //  a : 2, b: 1, c : 1
    // ]
    // aabc
    private static Character findNonRepeating(String input) {
        HashMap<Character, Integer> map = new HashMap<>();

        for (Character c : input.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        for (Map.Entry<Character, Integer> entry : map.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }

        return null;
    }
}