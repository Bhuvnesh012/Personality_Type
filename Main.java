import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Map<Character, Integer> responseCount = new HashMap<>();

        // Get user responses
        for (int i = 1; i <= 5; ++i) {
            char response = getUserResponse(i);
            responseCount.put(response, responseCount.getOrDefault(response, 0) + 1);
        }

        // Find and display the most common response
        char mostCommonResponse = findMostCommonResponse(responseCount);
        System.out.println("The most common response submitted is: " + mostCommonResponse);

        // Display specific message based on the most common response
        displayMessage(mostCommonResponse);
    }

    public static char getUserResponse(int questionNumber) {
        char response;
        Scanner scanner = new Scanner(System.in);
        do {
            System.out.print("Enter response for question " + questionNumber + " (A, T, H, or S): ");
            response = scanner.next().toUpperCase().charAt(0);
            if (response != 'A' && response != 'T' && response != 'H' && response != 'S') {
                System.out.println("Invalid response. Please enter A, T, H, or S.");
            }
        } while (response != 'A' && response != 'T' && response != 'H' && response != 'S');
        return response;
    }

    public static char findMostCommonResponse(Map<Character, Integer> responseCount) {
        char mostCommonResponse = 'A';  // Default to 'A' if all responses are tied
        int maxCount = 0;
        for (Map.Entry<Character, Integer> entry : responseCount.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                mostCommonResponse = entry.getKey();
            }
        }
        return mostCommonResponse;
    }

    public static void displayMessage(char mostCommonResponse) {
        if (mostCommonResponse == 'A') {
            System.out.println("Beware! You are on the verge of being an alcoholic. " +
                    "Remember that 'Sobriety is a journey, not a destination.'");
        } else if (mostCommonResponse == 'T') {
            System.out.println("Good job! You’re a teetotaler!");
        } else if (mostCommonResponse == 'H') {
            System.out.println("Hi there! You’re not an alcoholic yet, but you are a heavy drinker. " +
                    "Try cutting down on your intake!");
        } else if (mostCommonResponse == 'S') {
            System.out.println("Not bad! You’re just a social drinker. Remember to stay in control!");
        }
    }
}
