using Newtonsoft.Json;
using OxbridgeRaceMobileApp2.Model;
using OxbridgeRaceMobileApp2.View;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace OxbridgeRaceMobileApp2.ViewModel
{
    public class LoginViewModel : BaseViewModel
    {
        private HttpClient client = new HttpClient();
        private const string NicklasURL = @"http://192.168.87.131:3000/logincrew";
        private const string PhoneUrl = @"http://192.168.43.161:3000/logincrew";
        private const string MathiasURI = @"http://192.168.1.92:3000/gps";
        public LoginViewModel()
        {
            client = new HttpClient();
        }
        public ICommand SimpleLogin => new Command(async () => {

            // navigate to the next page after you have logged in 
            await LoginIsvalid();

        });

        private string userName;
        public string UserName
        {
            get { return userName; }
            set { userName = value; OnPropertyChanged(); }
        }

        private string userPassword;

        public string UserPassword
        {
            get { return userPassword; }
            set { userPassword = value; OnPropertyChanged(); }
        }

        public async Task LoginIsvalid()
        {

            try
            {
                Console.WriteLine("LOGIN ER BLEVET TRYKKET PÅ");

                Console.WriteLine("PASSWORD ER DETTE:    "+UserPassword);
                var post = new CrewLoginInfo { fld_CrewName = UserName, fld_Password = UserPassword };
                Console.WriteLine("FLDPASSWORD ER:   "+post.fld_Password);
                var requestString = JsonConvert.SerializeObject(post);
                // making it content
                var content = new StringContent(requestString, Encoding.UTF8, "application/json");
                // posting 
                var response = await client.PostAsync(MathiasURI, content);
                // to see what could be wrong 
                var result = response.Content.ReadAsStringAsync().Result;
                if (response.IsSuccessStatusCode)
                {

                    Console.WriteLine("Succesfull RESULT" + result);
                    App.Current.MainPage = new NavigationPage(new MapView());
                }
                else
                {
                    Console.WriteLine("Something went wrong:   " + response);
                    Console.WriteLine("Failed RESULT:  " + result);
                }
            }
            catch (Exception e)
            {

                Console.WriteLine("Error:  " + e.Message);
            }




        }

    }
}