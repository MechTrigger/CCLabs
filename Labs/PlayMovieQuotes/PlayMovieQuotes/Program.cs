using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;

namespace PlayMovieQuotes
{
    class Program
    {
        

        static void Main(string[] args)
        {
            //THE QUOTE GAME
            Random rnd = new Random();
            int num = rnd.Next(1, 4);

            //MOVIE QUOTE 1
            if (num == 1)
            {
                SoundPlayer fullMetal = new SoundPlayer("C:/programming/sounds/fullMetalJacket.wav");
                fullMetal.PlaySync();
                Console.WriteLine("Can you guess the movie?");
                string input = Console.ReadLine();

                if (input == "Full Metal Jacket")
                {
                    Console.WriteLine("You are correct!");
                    SoundPlayer fullMetalRight = new SoundPlayer("C:/programming/sounds/fullMetalRight.wav");
                    fullMetalRight.PlaySync();
                    Console.ReadLine();
                }
                else
                {
                    Console.WriteLine("You are wrong!");
                    SoundPlayer fullMetalWrong = new SoundPlayer("C:/programming/sounds/fullMetalWrong.wav");
                    fullMetalWrong.PlaySync();
                    Console.ReadLine();
                }
                //MOVIE QUOTE 2
            } else if (num == 2) {
                SoundPlayer caddyshack = new SoundPlayer("C:/programming/Sounds/caddyshack.wav");
                caddyshack.PlaySync();
                Console.WriteLine("Can you guess the movie?");
                string input = Console.ReadLine();

                if (input == "Caddyshack")
                {
                    Console.WriteLine("You are correct!");
                    SoundPlayer caddyshackRight = new SoundPlayer("C:/programming/Sounds/caddyshackRight.wav");
                    caddyshackRight.PlaySync();
                    Console.ReadLine();
                }
                else
                {
                    Console.WriteLine("You are wrong!");
                    SoundPlayer caddyshackWrong = new SoundPlayer("C:/programming/Sounds/caddyshackWrong.wav");
                    caddyshackWrong.PlaySync();
                    Console.ReadLine();
                }
                //MOVIE QUOTE 3
            } else
            {
                SoundPlayer aliens = new SoundPlayer("C:/programming/Sounds/aliens.wav");
                aliens.PlaySync();
                Console.WriteLine("Can you guess the movie?");
                string input = Console.ReadLine();

                if (input == "Aliens")
                {
                    Console.WriteLine("You are correct!");
                    SoundPlayer aliensRight = new SoundPlayer("C:/programming/Sounds/aliensRight.wav");
                    aliensRight.PlaySync();
                    Console.ReadLine();
                }
                else
                {
                    Console.WriteLine("You are wrong!");
                    SoundPlayer aliensWrong = new SoundPlayer("C:/programming/Sounds/aliensWrong.wav");
                    aliensWrong.PlaySync();
                    Console.ReadLine();
                }
            }
        }
    }
}
