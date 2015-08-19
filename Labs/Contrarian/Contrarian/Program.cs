using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contrarian
{
    class Program
    {
        static void Main(string[] args)
        {

            Console.WriteLine("Write a sentence about something you like or don't like: ");
            string sentence = Console.ReadLine();
            var splitSentence = sentence.Split(' ');

            for (int i = 0; i < splitSentence.Length; i++)
            {
                if (splitSentence[i] == "don't")
                {
                    string response = sentence.Replace(" don't ", " ");
                    Console.WriteLine(response);
                    Console.ReadLine();
                    
                }
                
                else
                {
                    string response = sentence.Replace("I", "I don't");
                    Console.WriteLine(response);
                    Console.ReadLine();
                    
                }
            }
            //string test = "I don't like cats.";
            //test = test.Replace(" don't ", " ");
           

            //Console.WriteLine(test);
            //Console.ReadLine();

        }
    }
}
