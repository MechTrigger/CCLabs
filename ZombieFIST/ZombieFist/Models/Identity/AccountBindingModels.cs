using System.ComponentModel.DataAnnotations;

namespace ZombieFist.Models.Identity
{
    // Models used as parameters to AccountController actions.

    // NOTE: Removed [Display] and [DataType] Attributes as they 
    // are only used in MVC, and not in webapi/angular.
    // (we don't use Html.LabelFor() or Html.EditorFor() in angular)
    public class AddExternalLoginBindingModel
    {
        [Required]
        public string ExternalAccessToken { get; set; }
    }

    public class ChangePasswordBindingModel
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string NewPassword { get; set; }

        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    // NOTE: Added first and last name
    public class RegisterBindingModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 3)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class RegisterExternalBindingModel
    {
        [Required]
        public string Email { get; set; }
    }

    public class RemoveLoginBindingModel
    {
        [Required]
        public string LoginProvider { get; set; }

        [Required]
        public string ProviderKey { get; set; }
    }

    public class SetPasswordBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string NewPassword { get; set; }

        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
