using OxbridgeRaceMobileApp2.View;
using Plugin.Geolocator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Maps;

namespace OxbridgeRaceMobileApp2.ViewModel
{
   public class MapViewModel : BaseViewModel
    {
        public MapViewModel()
        {
            Map = new Map();

            
            GetCurrentLocation();

            //PositionChanged();
        }

        private bool isRunning = true;

        public bool IsRunning
        {
            get { return isRunning; }
            set { isRunning = value; }
        }

        public Pin pinNew = new Pin{ Label="Current Location" };

        public Map Map { get; private set; }
        
        private async void GetCurrentLocation()
        {   
            Map.Pins.Add(pinNew);
            while (IsRunning)
            {
                Console.WriteLine("Det vireker");
                var locator = CrossGeolocator.Current;
                locator.DesiredAccuracy = 0.1;
                // sets position to the current location
                var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));
                // moving the map to 
                Map.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(position.Latitude, position.Longitude),
                                                             Distance.FromKilometers(0.05)));

                //var pin = new Pin()
                //{
                //    Position = new Position(position.Latitude, position.Longitude),
                //    Label = "Current Location"
                //};

                //Map.Pins.Add(pin);

                pinNew.Position=new Position(position.Latitude, position.Longitude);

                await Task.Delay(1000);
            }
                        
         }

        public ICommand SimpleLogOut => new Command(async () => {

            // navigate to the next page after you have logged in 
            App.Current.MainPage = new LoginView();
            // setting IsRunnign to false so the geolacotor stops recording position
            IsRunning = false;

        });

       
    }
}
