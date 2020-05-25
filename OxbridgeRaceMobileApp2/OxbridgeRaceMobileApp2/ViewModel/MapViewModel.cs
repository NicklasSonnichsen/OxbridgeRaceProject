using OxbridgeRaceMobileApp2.View;
using Plugin.Geolocator;
using System;
using System.Collections.Generic;
using System.Text;
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
        }

        public Map Map { get; private set; }
        
        private async void GetCurrentLocation()
        {
            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 1;
            var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));
            Map.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(position.Latitude, position.Longitude),
                                                         Distance.FromKilometers(0.1)));

            var pin = new Pin()
            {
                Position = new Position(position.Latitude, position.Longitude),
                Label = "Current Location"
            };

            Map.Pins.Add(pin);
         }

        public ICommand SimpleLogOut => new Command(async () => {

            // navigate to the next page after you have logged in 
            App.Current.MainPage = new LoginView();

        });
    }
}
